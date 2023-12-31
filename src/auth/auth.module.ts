import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from 'src/users/schemas/user.schema';
import { HashingService } from '../hashing/hashing.service';
import { BcryptService } from '../hashing/bcrypt.service';
import { HashingModule } from 'src/hashing/hashing.module';
// import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        // useFactory: () => {
        useFactory: (hashingService: HashingService) => {
          console.log('creating user model injector');
          // const hashingService = new BcryptService();
          console.log(hashingService);
          //This code works as expected but...
          //Instead of create a new instance, I rather inject the service with the inject array
          const schema = UserSchema;

          schema.pre<UserDocument>('save', async function () {
            console.log('Entering the pre save hook');
            const doc = this;
            if (doc) {
              doc.password = await hashingService.hash(doc.password);
            }
            console.log('Leaving the pre save hook');
          });
          console.log((schema as any).s.hooks._pres);
          return schema;
        },
        imports: [HashingModule],
        inject: [HashingService],
      },
    ]),
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class AuthModule {}
