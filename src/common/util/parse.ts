import { Injectable } from '@nestjs/common';


@Injectable()
export class CustomParser{

    parseData = (data: Object) => {
        return Object.keys(data).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        }).join('&');
    }

}