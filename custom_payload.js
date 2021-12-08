import { check, sleep } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

let errCount = new Counter("errCount")

export const options = {
    stages: [
        { duration: '1m', target: '10'},
        { duration: '3m', target: '3000'},
        { duration: '1m', target: '10'}
    ],
    thresholds: { 
        http_req_duration: ['avg<100', 'p(95)<150'],
        errCount: ['count<500']
    }
}

export default function() {
    let res = http.get("http://jti.polinema.ac.id/ruangkelas/");
    let ok = check(res, {
        "is status 200": (r) => r.status == 200
    });

    if(!ok) {
        errCount.add(1)
    }

    sleep(1)
};