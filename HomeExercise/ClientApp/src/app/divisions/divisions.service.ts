import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BaseService } from "../shared/services/base-http.service";
import { DivisionData } from "./interfaces/division";

@Injectable()
export class DivisionsService extends BaseService {
  private currentDivisions: DivisionData;
  // public currentPage: number;

  public getCurrentDivisions() {
    return this.currentDivisions;
  }

  private currentDivisionsSubject: Subject<DivisionData> = new Subject<
    DivisionData
  >();

  // private currentPageSubject: Subject<number> = new Subject<number>();

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  public getDivisionData(skip = 0, take = 20): Observable<DivisionData> {
    const itemsToSkip = skip * take;
    const url = `divisions/divisionpage?skip=${itemsToSkip}&take=${take}`;

    return this.get<DivisionData>(url);
  }

  saveDivisionNotesData(notesData: { divisionId: number; notes: string }) {
    const url = "divisions/saveNotes";

    return this.post<any>(url, notesData);
  }

  public setCurrentDivisionData(_data: DivisionData) {
    this.currentDivisions = _data;

    this.currentDivisionsSubject.next(_data);
  }

  public getCurrentDivisionData(): Observable<DivisionData> {
    return this.currentDivisionsSubject.asObservable();
  }

  // public getCurrentPage(): Observable<number> {
  //   return this.currentPageSubject.asObservable();
  // }

  // public setCurrentPage(_pageNumber: number) {
  //   this.currentPage = _pageNumber;

  //   this.currentPageSubject.next(_pageNumber);
  // }
}
