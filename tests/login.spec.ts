import test from "@playwright/test";
import LoginPage from "./page-objects/LoginPage";

test.describe("Página de Login", () => {
    test("Deve fazer login com email e senha válidos", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.visit()
        await loginPage.login("rafaelfrossard@gmail.com", "@Rafael1")
        await loginPage.loginSuccess()
    })

    test("Erro de login com email inválido", async({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.visit()
        await loginPage.login("rafaelfrossard10@gmail.com", "@Rafael1")
        await loginPage.errorMessage("Erro ao entrar")
    })
})