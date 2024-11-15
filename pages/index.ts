import { Page } from "playwright";
import { PublicMenu } from "./public-menu";
import { ProfilePage } from "./profile-page";
import { NewOrderPage } from "./new-order-page";
import { LoginPage } from "./new-structure/pages/login-page";
import { InternalMenu } from "./internal-menu";
import { ApplicationsPage } from "./main-page";
import { ApplicationDetailPage } from "./aplication-detail-page";
import { RegistrationPage } from "./new-structure/pages/registration-page";
import { ForgotPasswordPage } from "./new-structure/pages/forgot-password-page";
import { OrdersPage } from "./orders-page";

export class AllPages {
  public headerMenu: PublicMenu;
  public profilePage: ProfilePage;
  public newOrderPage: NewOrderPage;
  public loginPage: LoginPage;
  public internalMenu: InternalMenu;
  public applicationsPage: ApplicationsPage;
  public applicationDetailPage: ApplicationDetailPage;
  public registrationPage: RegistrationPage;
  public forgotPasswordPage: ForgotPasswordPage;
  public ordersPage: OrdersPage;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.headerMenu = new PublicMenu(page);
    this.profilePage = new ProfilePage(page);
    this.newOrderPage = new NewOrderPage(page);
    this.loginPage = new LoginPage(page);
    this.internalMenu = new InternalMenu(page);
    this.applicationsPage = new ApplicationsPage(page);
    this.applicationDetailPage = new ApplicationDetailPage(page);
    this.registrationPage = new RegistrationPage(page);
    this.forgotPasswordPage = new ForgotPasswordPage(page);
    this.ordersPage = new OrdersPage(page);
  }

  public async visitPage(): Promise<void> {
    await this.page.goto("/");
  }
}
