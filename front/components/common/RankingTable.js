export default function RankingTable({ rankings }) {
  const oddRank = 'text-center bg-green-200 py-2';
  const evenRank = 'text-center py-2';
  const test1 = ' w-1/5';
  const test2 = ' w-3/5';

  return (
    <>
      <table class="border-collapse table-auto w-4/5">
        <thead>
          <tr>
            <th class="bg-gray-200 py-2">Ranking</th>
            <th class="bg-gray-200 py-2">ID</th>
            <th class="bg-gray-200 py-2">TotalTime</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => {
            if (index % 2 === 0) {
              return (
                <tr key={index}>
                  <td class={oddRank + test1}>{index + 1}</td>
                  <td class={oddRank + test2}>{ranking.user_id}</td>
                  <td class={oddRank + test1}>{ranking.totalTime}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td class={evenRank}>{index + 1}</td>
                  <td class={evenRank}>{ranking.user_id}</td>
                  <td class={evenRank}>{ranking.totalTime}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
