import { FunctionComponent } from 'react';
import Layout from '../Layout/Layout';
import Converter from '../Converter/Converter'

const App: FunctionComponent<{}> = () => {
  return (
    <Layout>
      <Converter/>
    </Layout>
  );
};

export default App;
