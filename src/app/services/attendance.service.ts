import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.endpoint + 'api/attendance/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class AttendanceService {
    constructor(private http: HttpClient) {}

    getAllAttendances(idCompany): Observable<any> {
        return this.http.post(
            API_URL + 'allAttendances',
            {
                idCompany,
            },
            httpOptions,
        );
    }

    getAttendanceByUser(idUser): Observable<any> {
        return this.http.post(
            API_URL + 'getAttendance',
            {
                idUser,
            },
            httpOptions,
        );
    }

    getMyAttendances(idUser, year, month): Observable<any> {
        return this.http.post(
            API_URL + 'getMyAttendances',
            {
                idUser,
                year,
                month,
            },
            httpOptions,
        );
    }

    getDataAttendances(idCompany): Observable<any> {
        return this.http.post(
            API_URL + 'getDataAttendances',
            {
                idCompany,
            },
            httpOptions,
        );
    }

    checkInAttendance(userId, companyId, placeId, vehicleId): Observable<any> {
        return this.http.post(
            API_URL + 'checkInAttendance',
            {
                userId,
                companyId,
                placeId,
                vehicleId,
            },
            httpOptions,
        );
    }
    checkOutAttendance(id, userId): Observable<any> {
        return this.http.post(
            API_URL + 'checkOutAttendance',
            {
                id,
                userId,
            },
            httpOptions,
        );
    }
}
