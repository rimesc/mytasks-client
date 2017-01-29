import { Priority } from './priority';
import { replace } from './task-form';

describe('TaskForm', () => {

  describe('replace', () => {

    it('should convert priority from a string', () => {
        expect(replace('priority', 'CRITICAL')).toEqual(Priority.CRITICAL);
        expect(replace('priority', 'HIGH')).toEqual(Priority.HIGH);
        expect(replace('priority', 'NORMAL')).toEqual(Priority.NORMAL);
        expect(replace('priority', 'LOW')).toEqual(Priority.LOW);
    });

  });

});
