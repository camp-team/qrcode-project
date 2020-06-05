import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CodeCard } from '../interfaces/code-card';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async createCodeCard(
    codeCard: Omit<CodeCard, 'cardId'>,
    imageDataURL: string | ArrayBuffer
  ): Promise<void> {
    const cardId = this.db.createId();
    const imageURL: string = await this.getUploadImageURL(cardId, imageDataURL);
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

  getCodeCards(): Observable<CodeCard[]> {
    return this.db.collection<CodeCard>(`codeCards`).valueChanges();
  }

  getCodeCard(cardId: string): Observable<CodeCard> {
    return this.db.doc<CodeCard>(`codeCards/${cardId}`).valueChanges();
  }

  updateCodeCard(codeCard: CodeCard): Promise<void> {
    return this.db
      .doc(`codeCards/${codeCard.cardId}`)
      .update(codeCard)
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

  async getUploadImageURL(
    cardId: string,
    imageDataURL: string | ArrayBuffer
  ): Promise<string> {
    const result = await this.storage
      .ref(`codeCard/${cardId}`)
      .put(imageDataURL);
    return result.ref.getDownloadURL();
  }
}
