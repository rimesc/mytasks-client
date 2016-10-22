import { MyTasksClientPage } from './app.po';

describe('my-tasks-client App', function() {
  let page: MyTasksClientPage;

  beforeEach(() => {
    page = new MyTasksClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
