import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CodeCard } from '../interfaces/code-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private db: AngularFirestore) {}

  createCodeCard(codeCard: Omit<CodeCard, 'cardId'>): Promise<void> {
    const cardId = this.db.createId();
    return this.db
      .doc(`codeCards/${cardId}`)
      .set({
        cardId,
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
}
