import { HttpClientModule } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";

import { DivisionsService } from "./divisions.service";

describe("DivisionsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivisionsService],
      imports: [HttpClientModule],
    });
  });

  it("should be created", inject(
    [DivisionsService],
    (service: DivisionsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
