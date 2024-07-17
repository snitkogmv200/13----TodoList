import { ApiProperty } from '@nestjs/swagger';

export class AuthModel {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseTZhMGNnNjAwMDBjdzF3NXZrZ2g1ZW8iLCJlbWFpbCI6ImdyaXNodmFmY2ZAbWFpbC5ydSIsImlhdCI6MTcyMDAzNzY1NCwiZXhwIjoxNzIwMTI0MDU0fQ.H23xYgvsC61-iIppVpUNGeAZXPU8UT4I7w2mnem_SA0',
    description: 'Токен доступа',
  })
  token: string;
}
