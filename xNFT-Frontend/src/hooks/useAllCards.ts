import { useContext } from 'react';
import { Context } from '@src/contexts/provider/Provider';
import { IdentifierMap } from '@utils/constants';
import Axios from 'axios';
import config from '../config';

const useAllCards = () => {
  const { lang, originChainId } = useContext(Context);
  return async (pageSize: number) => {
    const identifier = IdentifierMap[originChainId];
    try {
      const response: any = await Axios.get(
        `${config.fetchUrl}/api/v1/xnft/public/nft/${identifier}?&page=1&pageSize=${pageSize}`,
        {
          headers: {
            'Accept-Language': lang,
          },
        },
      );
      const { data } = response.data;
      return (
        data || {
          countId: '',
          current: 1,
          hitCount: false,
          maxLimit: null,
          optimizeCountSql: true,
          orders: [],
          pages: 0,
          records: [],
          searchCount: true,
          size: 10,
          total: 0,
        }
      );
    } catch (e) {
      console.error('failed to get user cards', e);
      return {
        countId: '',
        current: 1,
        hitCount: false,
        maxLimit: null,
        optimizeCountSql: true,
        orders: [],
        pages: 0,
        records: [],
        searchCount: true,
        size: 10,
        total: 0,
      };
    }
  };
};

export default useAllCards;
