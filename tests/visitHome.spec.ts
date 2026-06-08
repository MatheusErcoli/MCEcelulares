import { expect, test} from '@playwright/test';

test.describe("Página Inicial", ()=> {
  test("Deve visitar a página incial", async({page}) => {
    await page.goto("/")
    //await expect(page).toHaveTitle("localhost/contato")
    const titles = page.getByRole('heading', {name: 'Destaques'})

    await expect(titles).toBeVisible()
  });
});