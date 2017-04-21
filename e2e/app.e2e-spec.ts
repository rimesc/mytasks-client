import { MyTasksClientPage } from './app.po';

describe('myTasks client', function() {
  let page: MyTasksClientPage;

  beforeEach(() => {
    page = new MyTasksClientPage();
  });

  it('should initially display dashboard', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Dashboard');
  });
});
