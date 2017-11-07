import { EventusPage } from './app.po';

describe('eventus App', () => {
  let page: EventusPage;

  beforeEach(() => {
    page = new EventusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
