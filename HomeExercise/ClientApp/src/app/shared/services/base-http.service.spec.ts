import { HttpClientModule } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";

import { BaseService } from "./base-http.service";

describe("BaseHttpService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService],
      imports: [HttpClientModule],
    });
  });

  it("should be created", inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));
});
