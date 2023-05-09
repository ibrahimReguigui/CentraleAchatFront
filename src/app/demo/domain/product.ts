export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}



    // private Long idVehicule;
    // private String model;
    // private String registrationNumber;
    // private String image;
    // private String type;
    // private String color;
    // @NotEmpty(message = "idSupplier is mandatory")
    // private String idSupplier;
    // @Enumerated(EnumType.STRING)
    // private StatusVehicule statusVehicule =  StatusVehicule.Disponible;
    // @Enumerated(EnumType.STRING)
    // private Location location ;
    // private String idLivreur;
    // private LocalDateTime createdAt;
    // private String createdBy;
    // private LocalDateTime updatedAt;
    // private String updatedBy;