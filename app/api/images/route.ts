import { NextResponse } from 'next/server';
import { supabase } from '../../../dbclient/superBaseClient';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const path = searchParams.get('path')?.trim();

	if (!path) {
		return NextResponse.json(
			{ error: 'Image path is required.' },
			{ status: 400 },
		);
	}

	const candidates = [
		`compressed_Public/squareImages/${path}.jpg`,
		`compressed_Public/sqaureImages/${path}.jpg`,
	];
	const { data } = supabase.storage
		.from('gameThumbnails')
		.getPublicUrl(candidates[0]);
	return NextResponse.redirect(data.publicUrl);
}
