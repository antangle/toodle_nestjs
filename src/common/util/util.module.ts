import { CustomParser } from './parse';
import { Module } from "@nestjs/common";

@Module({
    providers:[
        CustomParser
    ]
})

export class UtilModule{}