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
    console.log(codeCard);
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
}
