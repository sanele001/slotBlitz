import { NextResponse } from 'next/server';
import { supabase } from '../../../../dbclient/superBaseClient';

export async function GET() {
	const { count, error } = await supabase
		.from('slotcatalog')
		.select('*', { count: 'exact', head: true });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ count: count ?? 0 });
}
