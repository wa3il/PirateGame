package fr.univlyon1.m1if.m1if13.users;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Species of a user")
public enum Species {

    @Schema(description = "A pirate species")
    PIRATE,

    @Schema(description = "A villager species")
    VILLAGEOIS,

    @Schema(description = "An admin species")
    ADMIN
}
