import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CodeCard } from '@interfaces/code-card';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ElectronCard } from '@interfaces/electron-card';

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
    return this.db
      .doc(`codeCards/${cardId}`)
      .set({
        cardId,
        imageURL,
        ...codeCard,
      })
      .then(() => {
        console.log('データの追加に成功しました！');
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

  getCodeCard(cardId: string): Observable<CodeCard> {
    return this.db.doc<CodeCard>(`codeCards/${cardId}`).valueChanges();
  }

  async updateCodeCard(
    codeCard: Omit<CodeCard, 'imageURL'>,
    file?: File
  ): Promise<void> {
    const data: any = {};
    if (file) {
      const imageURL: string = await this.getUploadImageURL(
        codeCard.cardId,
        file
      );
      data.imageURL = imageURL;
    }
    return this.db
      .doc(`codeCards/${codeCard.cardId}`)
      .update({
        ...data,
        ...codeCard,
      })
      .then(() => {
        console.log('データを編集しました');
      });
  }

  deleteCodeCard(cardId: string): Promise<void> {
    return this.db
      .doc(`codeCards/${cardId}`)
      .delete()
      .then(() => {
        console.log('データを削除しました');
      });
  }

  deleteElectronCard(cardId: string): Promise<void> {
    return this.db.doc(`electronCards/${cardId}`).delete();
  }

  async getUploadImageURL(cardId: string, file: File): Promise<string> {
    const result = await this.storage.ref(`codeCards/${cardId}`).put(file);
    return result.ref.getDownloadURL();
  }
}
