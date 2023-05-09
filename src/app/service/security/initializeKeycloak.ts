import {KeycloakService} from "keycloak-angular";


export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8099',
                realm: 'pidev',
                clientId: 'pidev',
            },
            initOptions: {
                onLoad: 'check-sso',
                checkLoginIframe: true,
            },
        });
}
