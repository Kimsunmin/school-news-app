import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
    @ApiProperty({
        example: 'school name',
        description: '학교명',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: 'school location',
        description: '학교 지역명',
        required: true,
    })
    location: string;
} 