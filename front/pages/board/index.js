import BoardCard from '../../components/common/BoardCard';
import Helmet from '../../components/layout/Helmet';

export default function board(profileURL) {
  return (
    <div class="flex flex-raw flex-wrap lg:grid grid-rows-3 grid-flow-col gap-4 ">
      <Helmet title="board" />

      <BoardCard profileURL={profileURL} />
      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />

      <BoardCard profileURL={profileURL} />
    </div>
  );
}
