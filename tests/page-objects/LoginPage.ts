import { expect, Locator, Page } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page
    private readonly loginButton: Locator;
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly accessButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.loginButton = page.getByTestId('login-button')
        this.inputEmail = page.getByTestId('input-email-login')
        this.inputPassword = page.getByTestId('input-password-login')
        this.accessButton = page.getByTestId("access-button-login")
    }

    async visit() {
        await this.page.goto("/")
        await this.loginButton.click();
        await expect(this.page).toHaveURL("/login")
    }

    async login(email: string, password: string) {
        await this.inputEmail.fill(email)
        await this.inputPassword.fill(password)
        await this.accessButton.click()
    }

    async loginSuccess() {
        await expect(this.page).toHaveURL("/")
    }

    async errorMessage(message: string) {
        const errorElement = this.page.getByText(message)
        await expect(errorElement).toBeVisible()
    }
}