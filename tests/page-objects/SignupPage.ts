import { expect, Locator, Page } from "@playwright/test";

export default class SignupPage {
    private readonly page: Page;
    private readonly signupButton: Locator;
    private readonly inputName: Locator;
    private readonly inputEmail: Locator;
    private readonly inputCpf: Locator;
    private readonly inputPhone: Locator;
    private readonly inputPassword: Locator;
    private readonly inputRepeatPassword: Locator;
    private readonly accessButton: Locator;

    private readonly swalMessage: Locator;
    private readonly swalTitle: Locator;
    private readonly swalConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.signupButton = page.getByTestId('signup-button');
        this.inputName = page.getByTestId('input-name-signup');
        this.inputEmail = page.getByTestId('input-email-signup');
        this.inputCpf = page.getByTestId('input-cpf-signup');
        this.inputPhone = page.getByTestId('input-phone-signup');
        this.inputPassword = page.getByTestId('input-password-signup');
        this.inputRepeatPassword = page.getByTestId('input-repeat-password-signup');
        this.accessButton = page.getByTestId("access-button-signup");

        this.swalTitle = page.locator('.swal2-title');
        this.swalMessage = page.locator('.swal2-html-container');
        this.swalConfirmButton = page.locator('.swal2-confirm');
    }

    async visit() {
        await this.page.goto("/");
        await this.signupButton.click();
        await expect(this.page).toHaveURL("/cadastro");
    }

    async signup(name: string, email: string, cpf: string, phone: string, password: string, repeatPassword: string) {
        await this.inputName.fill(name);
        await this.inputEmail.fill(email);
        await this.inputCpf.fill(cpf);
        await this.inputPhone.fill(phone);
        await this.inputPassword.fill(password);
        await this.inputRepeatPassword.fill(repeatPassword);
        await this.accessButton.click();
    }

    async verifySuccessMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Cadastro realizado com sucesso!");
        await this.swalConfirmButton.click();
    }

    
    async verifyErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao cadastrar");
        await this.swalConfirmButton.click();
    }
}