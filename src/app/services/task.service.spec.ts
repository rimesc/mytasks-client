/* tslint:disable:no-unused-variable */

import { OpaqueToken } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, ResponseType, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { API_BASE } from './service-constants';
import { TaskService } from './task.service';
import { Task } from '../api/task';
import { Priority } from '../api/priority';
import { State } from '../api/state';

describe('TaskService', () => {

  beforeEach(() => {
    let config = {
      providers: [
        TaskService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: AuthHttp,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
        {
          provide: API_BASE, useValue: 'http://www.example.com/api/'
        }
      ],
    };
    TestBed.configureTestingModule(config);
  });

  let mockResponse;
  let actualRequest;

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    mockResponse = { body: '', status: 200, type: ResponseType.Default };
    actualRequest = { url: '', body: '', method: undefined as RequestMethod };
    backend.connections.subscribe((c: MockConnection) => {
      actualRequest.url = c.request.url;
      actualRequest.body = c.request.text();
      actualRequest.method = c.request.method;
      const response = new MockResponse(new ResponseOptions(mockResponse));
      return mockResponse.type === ResponseType.Error ? c.mockError(response) : c.mockRespond(response);
    });
  }));

  // http://stackoverflow.com/questions/35436261/how-to-mock-http-error-for-angular2-testing
  class MockResponse extends Response implements Error {
    name: any;
    message: any;
  }

  describe('getTasks()', () => {

    it ('should load the list of tasks for a project',
      async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      mockResponse.body = `[
        {
          "id" : 1,
          "summary" : "My first task",
          "priority" : "LOW",
          "state" : "TO_DO",
          "created" : "2016-12-06T20:39:09.076+0000",
          "tags" : [ "Bug", "Version 1" ],
          "project" : { "id" : 1, "name" : "My first project" },
          "href" : "/api/tasks/1"
        },
        {
          "id" : 2,
          "summary" : "My second task",
          "priority" : "NORMAL",
          "state" : "IN_PROGRESS",
          "created" : "2016-12-06T20:39:09.076+0000",
          "updated" : "2016-12-06T21:21:01.209+0000",
          "tags" : [ ],
          "project" : { "id" : 1, "name" : "My first project" },
          "href" : "/api/tasks/2"
        }
      ]`;
      service.getTasks(1).toPromise().then(tasks => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/tasks/?project=1');
        expect(actualRequest.method).toEqual(RequestMethod.Get);
        expect(tasks.length).toEqual(2);
        expect(tasks[0]).toEqual({
          id: 1, summary: 'My first task', priority: Priority.LOW, state: State.TO_DO,
          created: new Date('2016-12-06T20:39:09.076+0000'),
          tags: [ 'Bug', 'Version 1' ], project: { id: 1, name: 'My first project' }, href: '/api/tasks/1'
        });
        expect(tasks[1]).toEqual({
          id: 2, summary: 'My second task', priority: Priority.NORMAL, state: State.IN_PROGRESS,
          created: new Date('2016-12-06T20:39:09.076+0000'), updated: new Date('2016-12-06T21:21:01.209+0000'),
          tags: [ ], project: { id: 1, name: 'My first project' }, href: '/api/tasks/2'
        });
      });
    })));

  });

  describe('getTask()', () => {

    it('should load a task', async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      mockResponse.body = `{
          "id" : 1,
          "summary" : "My first task",
          "priority" : "LOW",
          "state" : "TO_DO",
          "created" : "2016-12-06T20:39:09.076+0000",
          "updated" : "2016-12-06T21:21:01.209+0000",
          "tags" : [ "Bug", "Version 1" ],
          "notes" : { "raw" : "This is *my* first task.", "html" : "<p>This is <em>my</em> first task.</p>" },
          "project" : { "id" : 1, "name" : "My first project" },
          "href" : "/api/tasks/1"
      }`;
      service.getTask(1).then(task => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/tasks/1');
        expect(actualRequest.method).toEqual(RequestMethod.Get);
        expect(task).toEqual({
          id: 1, summary: 'My first task', priority: Priority.LOW, state: State.TO_DO,
          created: new Date('2016-12-06T20:39:09.076+0000'), updated: new Date('2016-12-06T21:21:01.209+0000'),
          notes: { raw: 'This is *my* first task.', html: '<p>This is <em>my</em> first task.</p>' },
          tags: [ 'Bug', 'Version 1' ], project: { id: 1, name: 'My first project' }, href: '/api/tasks/1'
        });
      });
    })));

    it('should handle task not found gracefully',
       async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      mockResponse.type = ResponseType.Error;
      mockResponse.status = 404;
      mockResponse.body = `{
        "code": "Not Found",
        "message": "The requested task could not be found."
      }`;
      service.getTask(1).then(task => fail('Unexpectedly succeeded in loading task' + task)).catch(error =>
        expect(error).toEqual({ code: 'Not Found', message: 'The requested task could not be found.'})
      );
    })));

  });

  describe('createTask()', () => {

    it ('should create a new task', async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      mockResponse.body = `{
          "id" : 4,
          "summary" : "My new task",
          "priority" : "HIGH",
          "state" : "TO_DO",
          "created" : "2016-12-06T20:39:09.076+0000",
          "tags" : [ "Bug", "Version 1" ],
          "notes" : { "raw" : "This is *my* new task.", "html" : "<p>This is <em>my</em> new task.</p>" },
          "project" : { "id" : 1, "name" : "My first project" },
          "href" : "/api/tasks/4"
      }`;
      service.createTask(1, { summary: 'My new task', priority: Priority.HIGH, tags: [ 'Bug', 'Version 1' ] }).then(task => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1/tasks/');
        expect(actualRequest.method).toEqual(RequestMethod.Post);
        expect(actualRequest.body).toEqual(JSON.stringify({
          summary: 'My new task', priority: 'HIGH', tags: [ 'Bug', 'Version 1' ]
        }));
        expect(task).toEqual({
          id: 4, summary: 'My new task', priority: Priority.HIGH, state: State.TO_DO, tags: [ 'Bug', 'Version 1' ],
          created: new Date('2016-12-06T20:39:09.076+0000'),
          notes: { raw: 'This is *my* new task.', html: '<p>This is <em>my</em> new task.</p>' },
          project: { id: 1, name: 'My first project' }, href: '/api/tasks/4'
        });
      });
    })));

  });

  describe('updateNotes()', () => {

    it ('should update the notes for an existing task',
        async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      const markdown = 'These are *edited* notes.';
      mockResponse.body = `{
        "raw": "These are *edited* notes.",
        "html": "<p>These are <em>edited</em> notes.</p>",
        "href": "/api/tasks/1/notes"
      }`;
      service.updateNotes(1, markdown).then(notes => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/tasks/1/notes');
        expect(actualRequest.method).toEqual(RequestMethod.Post);
        expect(actualRequest.body).toEqual(markdown);
        expect(notes).toEqual({
          raw: 'These are *edited* notes.', html: '<p>These are <em>edited</em> notes.</p>',
          href: '/api/tasks/1/notes'
        });
      });
    })));

    it('should handle task not found gracefully',
       async(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
      mockResponse.type = ResponseType.Error;
      mockResponse.status = 404;
      mockResponse.body = `{
        "code": "Not Found",
        "message": "The requested task could not be found."
      }`;
      service.updateNotes(1, '')
        .then(notes => fail('Unexpectedly succeeded in updating notes: ' + notes)).catch(error =>
          expect(error).toEqual({ code: 'Not Found', message: 'The requested task could not be found.'})
      );
    })));

  });

  // describe('updateProject()', () => {

  //   it ('should update an existing project',
  //       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
  //     mockResponse.body = `{
  //       "id": 1,
  //       "name": "My updated project",
  //       "description": "This is my updated project.",
  //       "numberOfOpenTasks": 2,
  //       "href": "/api/projects/1"
  //     }`;
  //     const updates = {
  //       name: 'My updated project',
  //       description: 'This is my updated project.'
  //     };
  //     service.updateProject(1, updates).then(project => {
  //       expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1');
  //       expect(actualRequest.method).toEqual(RequestMethod.Post);
  //       expect(actualRequest.body).toEqual(JSON.stringify(updates));
  //       expect(project).toEqual({
  //         id: 1, name: 'My updated project', description: 'This is my updated project.',
  //         numberOfOpenTasks: 2, href: '/api/projects/1'
  //       });
  //     });
  //   })));

  //   it ('should strip out unexpected fields',
  //       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
  //     mockResponse.body = `{
  //       "id": 4,
  //       "name": "My new project",
  //       "description": "This is my new project.",
  //       "numberOfOpenTasks": 0,
  //       "href": "/api/projects/4"
  //     }`;
  //     service.updateProject(1, { name: 'My updated project', description: 'This is my updated project.', 'id': 3 } as Project)
  //            .then(project => {
  //       expect(actualRequest.body).toEqual(JSON.stringify({ name: 'My updated project', description: 'This is my updated project.' }));
  //     });
  //   })));

  //   it('should handle project not found gracefully',
  //      async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
  //     mockResponse.type = ResponseType.Error;
  //     mockResponse.status = 404;
  //     mockResponse.body = `{
  //       "code": "Not Found",
  //       "message": "The requested project could not be found."
  //     }`;
  //     service.updateProject(1, { name: 'My updated project', description: 'This is my updated project.' })
  //            .then(project => fail('Unexpectedly succeeded in updating project' + project)).catch(error =>
  //              expect(error).toEqual({ code: 'Not Found', message: 'The requested project could not be found.'})
  //     );
  //   })));

  // });

  // describe('deleteProject()', () => {

  //   it ('should delete an existing project',
  //       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
  //     service.deleteProject(1).then(() => {
  //       expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1');
  //       expect(actualRequest.method).toEqual(RequestMethod.Delete);
  //     });
  //   })));

  //   it('should handle project not found gracefully',
  //      async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
  //     mockResponse.type = ResponseType.Error;
  //     mockResponse.status = 404;
  //     mockResponse.body = `{
  //       "code": "Not Found",
  //       "message": "The requested project could not be found."
  //     }`;
  //     service.deleteProject(1).then(() => fail('Unexpectedly succeeded in deleting project')).catch(error =>
  //       expect(error).toEqual({ code: 'Not Found', message: 'The requested project could not be found.'})
  //     );
  //   })));

  // });

});
