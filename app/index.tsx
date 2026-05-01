import { Redirect } from 'expo-router';
import { ROUTE } from '../src/constants';

export default function Index() {
  return <Redirect href={ROUTE.TABS} />;
}
