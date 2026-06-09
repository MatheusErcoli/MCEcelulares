import { test } from "@playwright/test";
import SignupPage from "./page-objects/Signuppage";

test.describe("Página de Cadastro", () => {

    test("Deve realizar o cadastro com sucesso", async ({ page }) => {
        const signupPage = new SignupPage(page);

        await signupPage.visit();
        
        await signupPage.signup(
            "Rafael",
            "rafaelfrossard123@gmail.com", 
            "123.123.123-12", 
            "(12) 12345-1234", 
            "@Rafael1", 
            "@Rafael1"
        );
        
        await signupPage.verifySuccessMessage();
    });

    test("Deve exibir erro ao tentar cadastrar e-mail já existente", async ({ page }) => {
        const signupPage = new SignupPage(page);

        await signupPage.visit();
        
        await signupPage.signup(
            "Rafael",
            "rafael.duplicado@gmail.com", 
            "123.123.123-12", 
            "(12) 12345-1234", 
            "@Rafael1", 
            "@Rafael1"
        );
        
        await signupPage.verifyErrorMessage();
    });

    test("Deve exibir erro quando as senhas não coincidem", async ({ page }) => {
        const signupPage = new SignupPage(page);

        await signupPage.visit();
        
        await signupPage.signup(
            "Rafael",
            "rafaelfrossard@gmail.com", 
            "123.123.123-12", 
            "(12) 12345-1234", 
            "@Rafael1", 
            "SenhaDiferente123"
        );
        
        await signupPage.verifyErrorMessage();
    });
});