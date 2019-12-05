import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { Photon } from '@prisma/photon';
import { UserCrudResolver } from './generated/type-graphql';

interface Context {
  photon: Photon;
}

(async () => {
  const schema = await buildSchema({
    resolvers: [UserCrudResolver],
    emitSchemaFile: path.resolve(__dirname, 'generated-schema.graphql'),
    validate: false
  });
  const photon = new Photon({});
  const server = new ApolloServer({
    schema,
    playground: true,
    context: (): Context => ({ photon })
  });
  const { port } = await server.listen(4000);
  console.log(`listening on port ${port}`);
})().catch(console.error);
