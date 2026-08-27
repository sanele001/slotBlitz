import { NextResponse } from 'next/server';
import { supabase } from '../../../../dbclient/superBaseClient';

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const { data, error } = await supabase
		.from('review')
		.select('*')
		.eq('reviewSlug', slug)
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 404 });
	}

	return NextResponse.json(data);
}
