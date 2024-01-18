import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
// import dayjs from "dayjs";

// レスポンスの型
export type Contributions = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: [
          {
            contributionDays: [
              {
                date: string;
                contributionCount: number;
              }
            ];
          }
        ];
      };
    };
  };
};

// 最終的に描画時に利用するデータの型
export type MyContributes = {
  values: number[];
};

// メインとなる関数
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // リクエストのクエリをuserNameに代入
  const { userName } = request.query;

  // インスタンスを作成し、認証情報として環境変数に定義したGitHubトークンを渡す
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  // 開始日を指定
  const startDate = "2024-01-01T00:00:00"

  // 終了日を指定
  const lastDate = "2024-12-31T00:00:00"
  
  /**
   * クエリ部分
   * @param userName ユーザー名
   * @param lastDate 終了日
   * @param startDate 開始日
   */
  const query = `
    query contributions ($userName:String!, $lastDate:DateTime!, $startDate:DateTime!) {
      user(login: $userName) {
        contributionsCollection(to: $lastDate, from: $startDate) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  // クエリとそれに必要な引数を渡し、octokitを使いデータを取得する
  const contributions = await octokit.graphql<Contributions>(query, {
    userName,
    lastDate,
    startDate,
  });

  // レスポンスからコミット数だけを抜き出し格納するための配列を定義
  let contributionCount: number[] = [];

  // ループさせコミット数のみを配列にpushする       
  contributions.user.contributionsCollection.contributionCalendar.weeks.forEach(
    (week) => {
      week.contributionDays.forEach((contributionDay) => {
        contributionCount.push(contributionDay.contributionCount);
      });
    }
  );

  // コミット数のみ格納された配列を返却
  return response.status(200).json({
    values: contributionCount,
  });
}