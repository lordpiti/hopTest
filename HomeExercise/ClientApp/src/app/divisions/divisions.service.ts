import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { BaseService } from "../shared/services/base-http.service";
import { DivisionData } from "./interfaces/division";
import { NotesInfo } from "./interfaces/notesInfo";

@Injectable()
export class DivisionsService extends BaseService {
  private currentDivisions: DivisionData;

  public getCurrentDivisions() {
    return this.currentDivisions;
  }

  private currentDivisionsSubject: BehaviorSubject<
    DivisionData
  > = new BehaviorSubject<DivisionData>(null);

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  public getDivisionData(pageNumber = 1, take = 10): Observable<DivisionData> {
    const itemsToSkip = (pageNumber - 1) * take;
    const url = `divisions/divisionpage?skip=${itemsToSkip}&take=${take}`;

    return this.get<DivisionData>(url);
  }

  saveDivisionNotesData(notesData: NotesInfo) {
    const url = "divisions/saveNotes";

    return this.post<NotesInfo>(url, notesData);
  }

  public getCurrentDivisionData(): Observable<DivisionData> {
    return this.currentDivisionsSubject.asObservable();
  }

  public setCurrentDivisionData(_data: DivisionData) {
    this.currentDivisions = _data;

    this.currentDivisionsSubject.next(_data);
  }
}
