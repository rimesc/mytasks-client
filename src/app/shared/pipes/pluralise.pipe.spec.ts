import { PluralisePipe } from './pluralise.pipe';

describe('PluralisePipe', () => {

  let pluralise = new PluralisePipe();

  it('should format as "no things" for 0', () => {
    expect(pluralise.transform(0, 'task')).toEqual('no tasks');
  });

  it('should format as "1 thing" for 1', () => {
    expect(pluralise.transform(1, 'task')).toEqual('1 task');
  });

  it('should format as "n things" for n > 1', () => {
    expect(pluralise.transform(2, 'task')).toEqual('2 tasks');
    expect(pluralise.transform(33, 'task')).toEqual('33 tasks');
    expect(pluralise.transform(444, 'task')).toEqual('444 tasks');
  });

  it('should format as "-1 things" for -1 (why not?)', () => {
    expect(pluralise.transform(-1, 'task')).toEqual('-1 tasks');
  });

  it('should format as "n" if no noun is provided', () => {
    expect(pluralise.transform(0)).toEqual('0');
    expect(pluralise.transform(1)).toEqual('1');
    expect(pluralise.transform(2)).toEqual('2');
  });

});
