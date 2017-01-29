import { Priority } from './priority';
import { State } from './state';
import { revive } from './task';

describe('Task', () => {

  describe('revive', () => {

    it('should convert priority to a string', () => {
        expect(revive('priority', Priority.CRITICAL)).toEqual('CRITICAL');
        expect(revive('priority', Priority.HIGH)).toEqual('HIGH');
        expect(revive('priority', Priority.NORMAL)).toEqual('NORMAL');
        expect(revive('priority', Priority.LOW)).toEqual('LOW');
    });

    it('should convert state to a string', () => {
        expect(revive('state', State.TO_DO)).toEqual('TO_DO');
        expect(revive('state', State.IN_PROGRESS)).toEqual('IN_PROGRESS');
        expect(revive('state', State.ON_HOLD)).toEqual('ON_HOLD');
        expect(revive('state', State.DONE)).toEqual('DONE');
    });

    it('should convert created to a date', () => {
        expect(revive('created', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('created', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('created', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('created', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
    });

    it('should convert updated to a date', () => {
        expect(revive('updated', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('updated', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('updated', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
        expect(revive('updated', '2016-12-06T20:39:09.076+0000')).toEqual(new Date('2016-12-06T20:39:09.076+0000'));
    });

    it('should leave other fields unchanged', () => {
        expect(revive('id', 1)).toEqual(1);
        expect(revive('summary', 'My task')).toEqual('My task');
        expect(revive('notes', {raw: 'My task', html: '<p>My task</p>'})).toEqual({raw: 'My task', html: '<p>My task</p>'});
    });

  });

});
