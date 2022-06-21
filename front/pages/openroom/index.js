import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';

export default function Openroom() {
  return (
    <div class="flex flex-raw flex-wrap lg:grid grid-rows-3 grid-flow-col gap-4 ">
      <Helmet title="Openroom" />

      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
    </div>
  );
}
