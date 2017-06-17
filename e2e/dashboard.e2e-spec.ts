/// <reference types="jasmine-expect" />

import { DashboardPage } from './dashboard.po';

describe('the dashboard page', () => {
  let page: DashboardPage;

  beforeAll(() => {
    page = new DashboardPage();
    page.navigateTo();
  });

  it('is the active page', () => {
    expect(page.navbar.activePage).toEqual('Dashboard');
  });

  it('is titled "Dashboard"', () => {
    expect(page.pageTitle).toEqual('Dashboard');
  });

});
