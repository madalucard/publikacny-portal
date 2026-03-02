import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PostsService } from '../../core/services/posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct URL with page param', () => {
    service.getPosts(2).subscribe();

    const req = httpMock.expectOne((r) => r.params.get('page') === '2');
    expect(req.request.url).toContain('/posts');
    req.flush([]);
  });

  it('should include user_id param when filtering by author', () => {
    service.getPosts(1, 42).subscribe();

    const req = httpMock.expectOne((r) => r.params.get('user_id') === '42');
    expect(req).toBeTruthy();
    req.flush([]);
  });
});
