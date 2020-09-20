import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CodeCard } from '@interfaces/code-card';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ElectronCard } from '@interfaces/electron-card';
import { BasicCard } from '@interfaces/card';
import { firestore } from 'firebase/app';
import { CreditCard } from '@interfaces/credit-card';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cardCategories = [
    { type: 'code', name: 'モバイル決済' },
    { type: 'electron', name: '電子マネー' },
    { type: 'credit', name: 'クレジットカード' },
    { type: 'point', name: 'ポイントカード' },
  ];

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  getCardCategory(cardType: string): { type: string; name: string } {
    return this.cardCategories.find((list) => list.type === cardType);
  }

  getPopularCards(
    type: string
  ): Observable<(CodeCard | ElectronCard | CreditCard | BasicCard)[]> {
    return this.db
      .collection<CodeCard | ElectronCard | CreditCard | BasicCard>(
        `${type}Cards`,
        (ref) => ref.orderBy('viewCount', 'desc').limit(5)
      )
      .valueChanges();
  }

  getCardsByType(
    type: string
  ): Observable<Partial<CodeCard & ElectronCard & CreditCard & BasicCard>[]> {
    return this.db
      .collection<CodeCard | ElectronCard | CreditCard | BasicCard>(
        `${type}Cards`
      )
      .valueChanges();
  }

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

  async createCreditCard(
    creditCard: Omit<CreditCard, 'cardId' | 'imageURL'>,
    file: File
  ): Promise<void> {
    const cardId = this.db.createId();
    const imageURL = await this.getUploadImageURL(cardId, file);
    return this.db.doc(`creditCards/${cardId}`).set({
      cardId,
      imageURL,
      ...creditCard,
    });
  }

  async createPointCard(
    pointCard: Omit<BasicCard, 'cardId' | 'imageURL'>,
    file: File
  ): Promise<void> {
    const cardId = this.db.createId();
    const imageURL: string = await this.getUploadImageURL(cardId, file);
    return this.db.doc(`pointCards/${cardId}`).set({
      cardId,
      imageURL,
      ...pointCard,
    });
  }

  getCard(
    type: string,
    cardId: string
  ): Observable<Partial<CodeCard & ElectronCard & CreditCard & BasicCard>> {
    return this.db
      .doc<CodeCard | ElectronCard | CreditCard | BasicCard>(
        `${type}Cards/${cardId}`
      )
      .valueChanges();
  }

  getCodeCard(cardId: string): Observable<CodeCard> {
    return this.db.doc<CodeCard>(`codeCards/${cardId}`).valueChanges();
  }

  getElectronCard(cardId: string): Observable<ElectronCard> {
    return this.db.doc<ElectronCard>(`electronCards/${cardId}`).valueChanges();
  }

  getCreditCard(cardId: string): Observable<CreditCard> {
    return this.db.doc<CreditCard>(`creditCards/${cardId}`).valueChanges();
  }

  getPointCard(cardId: string): Observable<BasicCard> {
    return this.db.doc<BasicCard>(`pointCards/${cardId}`).valueChanges();
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

  async updateCreditCard(
    creditCard: Omit<CreditCard, 'imageURL'>,
    file?: File
  ): Promise<void> {
    const data: any = {};
    if (file) {
      const imageURL: string = await this.getUploadImageURL(
        creditCard.cardId,
        file
      );
      data.imageURL = imageURL;
    }
    return this.db.doc(`creditCards/${creditCard.cardId}`).update({
      ...data,
      ...creditCard,
    });
  }

  async updatePointCard(
    pointCard: Omit<BasicCard, 'imageURL'>,
    file?: File
  ): Promise<void> {
    const data: any = {};
    if (file) {
      const imageURL: string = await this.getUploadImageURL(
        pointCard.cardId,
        file
      );
      data.imageURL = imageURL;
    }
    return this.db.doc(`pointCards/${pointCard.cardId}`).update({
      ...data,
      ...pointCard,
    });
  }

  deleteCodeCard(cardId: string): Promise<void> {
    return this.db.doc(`codeCards/${cardId}`).delete();
  }

  deleteElectronCard(cardId: string): Promise<void> {
    return this.db.doc(`electronCards/${cardId}`).delete();
  }

  deleteCreditCard(cardId: string): Promise<void> {
    return this.db.doc(`creditCards/${cardId}`).delete();
  }

  deletePointCard(cardId: string): Promise<void> {
    return this.db.doc(`electronCards/${cardId}`).delete();
  }

  countUpCodeCard(cardId: string): Promise<void> {
    return this.db
      .doc<{
        viewCount: firestore.FieldValue;
      }>(`codeCards/${cardId}`)
      .update({
        viewCount: firestore.FieldValue.increment(1),
      });
  }

  countUpElectronCard(cardId: string): Promise<void> {
    return this.db
      .doc<{
        viewCount: firestore.FieldValue;
      }>(`electronCards/${cardId}`)
      .update({
        viewCount: firestore.FieldValue.increment(1),
      });
  }

  countUpCreditCard(cardId: string): Promise<void> {
    return this.db
      .doc<{
        viewCount: firestore.FieldValue;
      }>(`creditCards/${cardId}`)
      .update({
        viewCount: firestore.FieldValue.increment(1),
      });
  }

  countUpPointCard(cardId: string): Promise<void> {
    return this.db
      .doc<{
        viewCount: firestore.FieldValue;
      }>(`pointCards/${cardId}`)
      .update({
        viewCount: firestore.FieldValue.increment(1),
      });
  }

  private async getUploadImageURL(cardId: string, file: File): Promise<string> {
    const result = await this.storage.ref(`codeCards/${cardId}`).put(file);
    return result.ref.getDownloadURL();
  }

  async navigateComparedCards(cardType: string, cardId: string) {
    const otherCardIds = await this.getCardsByType(cardType)
      .pipe(
        map((cards) => {
          const cardIds = cards.map((card) => card.cardId);
          return cardIds.filter((id) => id !== cardId);
        }),
        take(1)
      )
      .toPromise();
    this.router.navigate(['/compare', cardType], {
      queryParams: {
        cardIds: [cardId, otherCardIds[0], otherCardIds[1]].join(','),
      },
    });
  }
}
