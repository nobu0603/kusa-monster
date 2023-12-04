// 型をimportしておく
import { MyContributes } from "@/pages/api/contributions/[userName]";

// カスタムフック本体
export const useContributions = () => {
  
  // userNameを引数に受け取り、先ほどの取得処理を行い、dataとして返す
  const getContributions = async (userName: string) => {
    const response = await fetch(`../api/contributions/${userName}`);
    const data: Promise<MyContributes> = await response.json();
    return data;
  };

  // 関数を返却
  return {
    getContributions,
  };
};