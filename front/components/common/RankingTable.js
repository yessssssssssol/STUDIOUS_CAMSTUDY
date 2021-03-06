export default function RankingTable({ rankings, userDatas }) {
  const oddRank = 'text-center bg-green-200 py-2';
  const evenRank = 'text-center py-2';
  const test1 = ' w-1/12';
  const test2 = ' w-2/12';
  const test3 = ' w-7/12';
  const test4 = ' w-2/12';

  return (
    <>
      <table className="border-collapse table-auto w-4/5">
        <thead>
          <tr>
            <th className="bg-gray-200 py-2">Ranking</th>
            <th className="bg-gray-200 py-2">Name</th>
            <th className="bg-gray-200 py-2">한 줄 소개</th>
            <th className="bg-gray-200 py-2">TotalTime</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => {
            // rankings의 user_id와 같은 id값을 갖는 user를 찾음
            const user = userDatas.find((userData) => {
              if (userData.id === ranking.user_id) {
                return true;
              }
            });
            if (index % 2 === 0) {
              return (
                <tr key={index}>
                  <td className={oddRank + test1}>{index + 1}</td>
                  <td className={oddRank + test2}>{user?.name}</td>
                  <td className={oddRank + test3}>{user?.description}</td>
                  <td className={oddRank + test4}>{ranking.totalTime}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td className={evenRank}>{index + 1}</td>
                  <td className={evenRank}>{user?.name}</td>
                  <td className={evenRank}>{user?.description}</td>
                  <td className={evenRank}>{ranking.totalTime}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
