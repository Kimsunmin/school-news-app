import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
    @ApiProperty({
        example: 'title',
        description: '학교 소식 제목',
        required: true,
    })
    title: string;

    @ApiProperty({
        example: 'description',
        description: '학교 소식 설명',
        required: true,
    })
    description: string;
}