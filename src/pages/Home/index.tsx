import DefaultLayout from '../../components/DefaultLayout';
import { Summary } from '../../components/Summary';
import { TableService } from '../../components/TableService';

function Home() {
  return (
    <DefaultLayout>
      <Summary />
      <TableService />
    </DefaultLayout>
  );
}

export default Home;
