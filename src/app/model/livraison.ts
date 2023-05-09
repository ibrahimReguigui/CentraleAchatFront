// src/app/model/livraison.ts
export class Livraison {
    idLivraison?: number;
    code?: string;
    statusLivraison?: string;
    description?: string;
    dateLivraisonPrevue?: Date;
    dateLivraison?: Date;
    idLivreur?: string;
    billId?: number;
    idVehicule?: number;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
  }