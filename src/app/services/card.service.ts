import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CodeCard } from '@interfaces/code-card';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ElectronCard } from '@interfaces/electron-card';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async createCodeCard(
    codeCard: Omit<CodeCard, 'cardId' | 'imageURL'>,
    file: File
  ): Promise<void> {
    const cardId = this.db.createId();
    const imageURL: string = await this.getUploadImageURL(cardId, file);
    return this.db.doc(`codeCards/${cardId}`).set({
      cardId,
      imageURL,
      ...codeCard,
    });
  }

  async createElectornCard(
    electronCard: Omit<ElectronCard, 'cardId' | 'imageURL'>,
    file: File
  ): Promise<void> {
    const cardId = this.db.createId();
    const imageURL = await this.getUploadImageURL(cardId, file);
    return this.db.doc(`electronCards/${cardId}`).set({
      cardId,
      imageURL,
      ...electronCard,
    });
  }

  getCodeCards(): Observable<CodeCard[]> {
    return this.db.collection<CodeCard>(`codeCards`).valueChanges();
  }

  getElectronCards(): Observable<ElectronCard[]> {
    return this.db.collection<ElectronCard>(`electronCards`).valueChanges();
  }

  getCodeCard(cardId: string): Observable<CodeCard> {
    return this.db.doc<CodeCard>(`codeCards/${cardId}`).valueChanges();
  }

  getElectronCard(cardId: string): Observable<ElectronCard> {
    return this.db.doc<ElectronCard>(`electronCards/${cardId}`).valueChanges();
  }

  async updateCodeCard(
    codeCard: Omit<CodeCard, 'imageURL'>,
    file?: File
  ): Promise<void> {
    const data: {
      imageURL?: string;
    } = {};
    if (file) {
      const imageURL: string = await this.getUploadImageURL(
        codeCard.cardId,
        file
      );
      data.imageURL = imageURL;
    }
    return this.db.doc(`codeCards/${codeCard.cardId}`).set(
      {
        ...data,
        ...codeCard,
      },
      { merge: true }
    );
  }

  async updateElectronCard(
    electronCard: Omit<ElectronCard, 'imageURL'>,
    file?: File
  ): Promise<void> {
    const data: any = {};
    if (file) {
      const imageURL: string = await this.getUploadImageURL(
        electronCard.cardId,
        file
      );
      data.imageURL = imageURL;
    }
    return this.db.doc(`electronCards/${electronCard.cardId}`).update({
      ...data,
      ...electronCard,
    });
  }

  deleteCodeCard(cardId: string): Promise<void> {
    return this.db.doc(`codeCards/${cardId}`).delete();
  }

  deleteElectronCard(cardId: string): Promise<void> {
    return this.db.doc(`electronCards/${cardId}`).delete();
  }

  countUpCodeCard(cardId: string): Promise<void> {
    return this.db.doc<CodeCard>(`codeCards/${cardId}`).update({
      viewCount: firestore.FieldValue.increment(1),
    });
  }
  countUpElectronCard(cardId: string): Promise<void> {
    return this.db.doc<ElectronCard>(`electronCards/${cardId}`).update({
      viewCount: firestore.FieldValue.increment(1),
    });
  }

  async getUploadImageURL(cardId: string, file: File): Promise<string> {
    const result = await this.storage.ref(`codeCards/${cardId}`).put(file);
    return result.ref.getDownloadURL();
  }
}
