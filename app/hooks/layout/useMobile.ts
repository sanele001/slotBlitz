import { useWindow } from './useWindow';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const { width } = useWindow();

	return width != null && width < MOBILE_BREAKPOINT;
}
