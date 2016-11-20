/* tslint:disable:no-unused-variable */

import { OpaqueToken } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, ResponseType, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { API_BASE } from './service-constants';
import { ProjectService } from './project.service';
import { Project } from '../api/project';

describe('ProjectService', () => {

  beforeEach(() => {
    let config = {
      providers: [
        ProjectService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
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

  describe('getProjects()', () => {

    it ('should load the list of projects', async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "projects": [
          {
            "id": 1,
            "name": "My first project",
            "description": "This is my first project.",
            "numberOfOpenTasks": 2,
            "href": "/api/projects/1"
          },
          {
            "id": 2,
            "name": "My second project",
            "description": "This is my second project.",
            "numberOfOpenTasks": 3,
            "href": "/api/projects/2"
          },
          {
            "id": 3,
            "name": "My third project",
            "description": "This is my third project.",
            "numberOfOpenTasks": 0,
            "href": "/api/projects/3"
          }
        ]
      }`;
      service.getProjects().then(projects => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/');
        expect(actualRequest.method).toEqual(RequestMethod.Get);
        expect(projects.length).toEqual(3);
        expect(projects[0]).toEqual({
          id: 1, name: 'My first project', description: 'This is my first project.',
          numberOfOpenTasks: 2, href: '/api/projects/1'
        });
        expect(projects[1]).toEqual({
          id: 2, name: 'My second project', description: 'This is my second project.',
          numberOfOpenTasks: 3, href: '/api/projects/2'
        });
        expect(projects[2]).toEqual({
          id: 3, name: 'My third project', description: 'This is my third project.',
          numberOfOpenTasks: 0, href: '/api/projects/3'
        });
      });
    })));

  });

  describe('getProject()', () => {

    it('should load a project', async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "id": 1,
        "name": "My first project",
        "description": "This is my first project.",
        "numberOfOpenTasks": 2,
        "href": "/api/projects/1"
      }`;
      service.getProject(1).then(project => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1');
        expect(actualRequest.method).toEqual(RequestMethod.Get);
        expect(project).toEqual({
          id: 1, name: 'My first project', description: 'This is my first project.',
          numberOfOpenTasks: 2, href: '/api/projects/1'
        });
      });
    })));

    it('should handle project not found gracefully',
       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.type = ResponseType.Error;
      mockResponse.status = 404;
      mockResponse.body = `{
        "code": "Not Found",
        "message": "The requested project could not be found."
      }`;
      service.getProject(1).then(project => fail('Unexpectedly succeeded in loading project' + project)).catch(error =>
        expect(error).toEqual({ code: 'Not Found', message: 'The requested project could not be found.'})
      );
    })));

  });

  describe('createProject()', () => {

    it ('should create a new project', async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "id": 4,
        "name": "My new project",
        "description": "This is my new project.",
        "numberOfOpenTasks": 0,
        "href": "/api/projects/4"
      }`;
      service.createProject({ name: 'My new project', description: 'This is my new project.' }).then(project => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/');
        expect(actualRequest.method).toEqual(RequestMethod.Post);
        expect(actualRequest.body).toEqual(JSON.stringify({ name: 'My new project', description: 'This is my new project.' }));
        expect(project).toEqual({
          id: 4, name: 'My new project', description: 'This is my new project.',
          numberOfOpenTasks: 0, href: '/api/projects/4'
        });
      });
    })));

    it ('should strip out unexpected fields',
        async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "id": 4,
        "name": "My new project",
        "description": "This is my new project.",
        "numberOfOpenTasks": 0,
        "href": "/api/projects/4"
      }`;
      service.createProject({ name: 'My new project', description: 'This is my new project.', 'id': 3 } as Project).then(project => {
        expect(actualRequest.body).toEqual(JSON.stringify({ name: 'My new project', description: 'This is my new project.' }));
      });
    })));

  });

  describe('updateProject()', () => {

    it ('should update an existing project',
        async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "id": 1,
        "name": "My updated project",
        "description": "This is my updated project.",
        "numberOfOpenTasks": 2,
        "href": "/api/projects/1"
      }`;
      const updates = {
        name: 'My updated project',
        description: 'This is my updated project.'
      };
      service.updateProject(1, updates).then(project => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1');
        expect(actualRequest.method).toEqual(RequestMethod.Post);
        expect(actualRequest.body).toEqual(JSON.stringify(updates));
        expect(project).toEqual({
          id: 1, name: 'My updated project', description: 'This is my updated project.',
          numberOfOpenTasks: 2, href: '/api/projects/1'
        });
      });
    })));

    it ('should strip out unexpected fields',
        async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.body = `{
        "id": 4,
        "name": "My new project",
        "description": "This is my new project.",
        "numberOfOpenTasks": 0,
        "href": "/api/projects/4"
      }`;
      service.updateProject(1, { name: 'My updated project', description: 'This is my updated project.', 'id': 3 } as Project)
             .then(project => {
        expect(actualRequest.body).toEqual(JSON.stringify({ name: 'My updated project', description: 'This is my updated project.' }));
      });
    })));

    it('should handle project not found gracefully',
       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.type = ResponseType.Error;
      mockResponse.status = 404;
      mockResponse.body = `{
        "code": "Not Found",
        "message": "The requested project could not be found."
      }`;
      service.updateProject(1, { name: 'My updated project', description: 'This is my updated project.' })
             .then(project => fail('Unexpectedly succeeded in updating project' + project)).catch(error =>
               expect(error).toEqual({ code: 'Not Found', message: 'The requested project could not be found.'})
      );
    })));

  });

  describe('deleteProject()', () => {

    it ('should delete an existing project',
        async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      service.deleteProject(1).then(() => {
        expect(actualRequest.url).toEqual('http://www.example.com/api/projects/1');
        expect(actualRequest.method).toEqual(RequestMethod.Delete);
      });
    })));

    it('should handle project not found gracefully',
       async(inject([ProjectService, MockBackend], (service: ProjectService, backend: MockBackend) => {
      mockResponse.type = ResponseType.Error;
      mockResponse.status = 404;
      mockResponse.body = `{
        "code": "Not Found",
        "message": "The requested project could not be found."
      }`;
      service.deleteProject(1).then(() => fail('Unexpectedly succeeded in deleting project')).catch(error =>
        expect(error).toEqual({ code: 'Not Found', message: 'The requested project could not be found.'})
      );
    })));

  });

});
