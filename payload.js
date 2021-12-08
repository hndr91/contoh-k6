import { check } from "k6";
import http from "k6/http";

export const options = {
    // Load atau Stress atau Spike atau Soak/Endurance
    stages: [
        { duration: '1m', target: '10'},
        { duration: '1m', target: '20'},
        { duration: '1m', target: '30'}
    ],
    thresholds: { 
        http_req_duration: ['avg<100', 'p(95)<150']
    }
}

export default function() {
    let res = http.get("http://jti.polinema.ac.id/ruangkelas/");
    
    check(res, {
        "is status 200": (r) => r.status == 200
    });
};